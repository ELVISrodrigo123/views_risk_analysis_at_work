import { ExcelFile } from "../models/ExcelFile";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/excel-files/`;

// Obtener todos los archivos Excel
export const getExcelFiles = async (): Promise<ExcelFile[]> => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Error al obtener los archivos Excel");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching Excel files:", error);
        throw error;
    }
};

// Crear un nuevo archivo Excel
export const createExcelFile = async (file: FormData): Promise<ExcelFile> => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: file,
        });
        if (!response.ok) {
            throw new Error("Error al subir el archivo Excel");
        }
        return await response.json();
    } catch (error) {
        console.error("Error creating Excel file:", error);
        throw error;
    }
};

// Actualizar un archivo Excel
export const updateExcelFile = async (id: number, data: Partial<ExcelFile>, file: File | null): Promise<ExcelFile> => {
    try {
        let body: FormData | string;
        let headers: HeadersInit = {};

        if (file) {
            // Si hay un archivo, usamos FormData
            const formData = new FormData();
            formData.append("file", file);
            if (data.description) formData.append("description", data.description);
            if (data.is_active !== undefined) {
                formData.append("is_active", data.is_active ? "true" : "false");
            }
            body = formData;
        } else {
            // Si no hay archivo, enviamos los datos como JSON
            headers["Content-Type"] = "application/json";
            body = JSON.stringify(data);
        }

        const response = await fetch(`${API_URL}${id}/`, {
            method: "PUT",
            headers,
            body,
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.error("Error Response:", errorResponse);
            throw new Error("Error al actualizar el archivo Excel");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating Excel file:", error);
        throw error;
    }
};

// Eliminar un archivo Excel
export const deleteExcelFile = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}${id}/delete/`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error al eliminar el archivo Excel");
        }
    } catch (error) {
        console.error("Error deleting Excel file:", error);
        throw error;
    }
};
