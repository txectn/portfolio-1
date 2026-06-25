import { useEffect } from "react";
import { api } from "./api";

export const useGet = ({
    path,
    setLoading,
    setData,
    setError,
    isAuth = false,
}) => {
    useEffect(() => {
        if (!path) return;

        let isMounted = true;

        const fetchData = async () => {
            try {
                setLoading?.(true);

                const response = await api.get(path, { isAuth });

                if (isMounted) {
                    setData?.(response.data);
                    setError?.(null);
                }
            } catch (error) {
                if (isMounted) {
                    setError?.(
                        error.response?.data?.message ||
                        error.response?.data ||
                        error.message ||
                        "Something went wrong"
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading?.(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [path, isAuth]);
};

const handleError = (error, setResponse) => {
    const errorData = {
        success: false,
        status: error.response?.status || null,
        message:
            error.response?.data?.message ||
            error.response?.data?.detail ||
            error.message ||
            "Something went wrong",
        errors: error.response?.data || null,
    };

    setResponse?.(errorData);

    return errorData;
};

export const postData = async ({ path, data, setResponse, isAuth = true }) => {
    try {
        if (!path) throw new Error("Path is required");
        if (!data) throw new Error("Data is required for POST");

        const response = await api.post(path, data, { isAuth });

        const successData = {
            success: true,
            status: response.status,
            message: response.data?.message || "Created successfully.",
            data: response.data,
        };

        setResponse?.(successData);

        return successData;
    } catch (error) {
        return handleError(error, setResponse);
    }
};

export const getData = async ({ path, setResponse, isAuth = false }) => {
    try {
        if (!path) throw new Error("Path is required");

        const response = await api.get(path, { isAuth });

        const successData = {
            success: true,
            status: response.status,
            message: response.data?.message || "Fetched successfully.",
            data: response.data,
        };

        setResponse?.(successData);

        return successData;
    } catch (error) {
        return handleError(error, setResponse);
    }
};

export const updateData = async ({ path, data, setResponse, isAuth = true }) => {
    try {
        if (!path) throw new Error("Path is required");
        if (!data) throw new Error("Data is required for PUT");

        const response = await api.put(path, data, { isAuth });

        const successData = {
            success: true,
            status: response.status,
            message: response.data?.message || "Updated successfully.",
            data: response.data,
        };

        setResponse?.(successData);

        return successData;
    } catch (error) {
        return handleError(error, setResponse);
    }
};

export const patchData = async ({ path, data, setResponse, isAuth = true }) => {
    try {
        if (!path) throw new Error("Path is required");
        if (!data) throw new Error("Data is required for PATCH");

        const response = await api.patch(path, data, { isAuth });

        const successData = {
            success: true,
            status: response.status,
            message: response.data?.message || "Updated successfully.",
            data: response.data,
        };

        setResponse?.(successData);

        return successData;
    } catch (error) {
        return handleError(error, setResponse);
    }
};

export const deleteData = async ({ path, setResponse, isAuth = true }) => {
    try {
        if (!path) throw new Error("Path is required");

        const response = await api.delete(path, { isAuth });

        const successData = {
            success: true,
            status: response.status,
            message: response.data?.message || "Deleted successfully.",
            data: response.data,
        };

        setResponse?.(successData);

        return successData;
    } catch (error) {
        return handleError(error, setResponse);
    }
};