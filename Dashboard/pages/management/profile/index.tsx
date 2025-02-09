import React, { useState, useEffect, useCallback } from 'react';
import { ExcelFile } from '../../../src/models/ExcelFile';
import { getExcelFiles, createExcelFile, updateExcelFile, deleteExcelFile } from '../../../src/services/excelFileService';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, IconButton, CircularProgress, Box } from '@mui/material';
import { UploadFile, Delete, CloudUpload } from '@mui/icons-material';
import SidebarLayout from '@/layouts/SidebarLayout';

function ManagementUserProfile() {
  const [excelFiles, setExcelFiles] = useState<ExcelFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const files = await getExcelFiles();
        setExcelFiles(files);
      } catch (error) {
        console.error('Error loading Excel files:', error);
        window.alert('Error al cargar los archivos.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileToUpload(event.target.files ? event.target.files[0] : null);
  };

  const handleFileUpload = async () => {
    if (!fileToUpload) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('description', 'Descripción opcional');
      formData.append('is_active', 'true');
      
      const newFile = await createExcelFile(formData);
      setExcelFiles((prev) => [...prev, newFile]);
      setFileToUpload(null);
      window.alert('Archivo subido correctamente.');
    } catch (error) {
      console.error('Error uploading Excel file:', error);
      window.alert('Error al subir el archivo.');
    } finally {
      setUploading(false);
    }
  };

  const handleStatusChange = useCallback(async (id: number, newStatus: boolean) => {
    setExcelFiles((prev) => prev.map(file => file.id === id ? { ...file, is_active: newStatus } : file));
    try {
      await updateExcelFile(id, { is_active: newStatus }, null);
    } catch (error) {
      console.error('Error updating file status:', error);
      window.alert('Error al actualizar el estado del archivo.');
    }
  }, []);

  const handleDeleteFile = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este archivo?')) return;
    try {
      await deleteExcelFile(id);
      setExcelFiles((prev) => prev.filter(file => file.id !== id));
      window.alert('Archivo eliminado correctamente.');
    } catch (error) {
      console.error('Error deleting file:', error);
      window.alert('Error al eliminar el archivo.');
    }
  };

  return (
    <div style={{padding:"3em"}}>
      <h1>ARCHIVOS EXCEL DOCUMENTADOS</h1>

      <Box display="flex" alignItems="center" gap={2}>
        <Button component="label" variant="contained" color="primary" startIcon={<CloudUpload />}>
          Seleccionar Archivo
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        <Button variant="contained" color="secondary" onClick={handleFileUpload} disabled={!fileToUpload || uploading} startIcon={uploading ? <CircularProgress size={24} /> : <UploadFile />}>
          {uploading ? 'Subiendo...' : 'Subir Archivo'}
        </Button>
      </Box>

      {loading ? (
        <CircularProgress sx={{ marginTop: 2 }} />
      ) : excelFiles.length === 0 ? (
        <p>No hay archivos disponibles.</p>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Archivo</TableCell>
                <TableCell>Fecha de Subida</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {excelFiles.map((file) => (
                <TableRow key={file.id}>
                  <TableCell>{file.file.split('/').pop()}</TableCell>
                  <TableCell>{new Date(file.uploaded_at).toLocaleString()}</TableCell>
                  <TableCell>
                    <Switch checked={file.is_active} onChange={(e) => handleStatusChange(file.id, e.target.checked)} />
                  </TableCell>
                  <TableCell>
                    <IconButton color="error" onClick={() => handleDeleteFile(file.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

ManagementUserProfile.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;
export default ManagementUserProfile;
