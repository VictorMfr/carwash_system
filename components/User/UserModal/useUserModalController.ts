import { useEffect, useState } from "react";
import { useUserContext } from "../ContextProvider";
import api from "@/lib/axios";
import { useUIDisplayControls } from "@/hooks/UIDisplayControlsProvider";
import useFetchRoles from "@/hooks/fetch/useFetchRoles";
import { Role } from "@/services/backend/models/associations";
import { handleApiError } from "@/lib/error";
import { ZodError } from "zod";
import { AxiosError } from "axios";
import { AssignRolesSchema, UserCreateSchema, UserUpdateSchema } from "@/lib/definitions";

type FieldState = { value: string; error: string };

interface FormState {
    name: FieldState;
    lastname: FieldState;
    phone: FieldState;
    address: FieldState;
    email: FieldState;
    password: FieldState;
    loading: boolean;
}

const initialFormData: FormState = {
    name: { value: '', error: '' },
    lastname: { value: '', error: '' },
    phone: { value: '', error: '' },
    address: { value: '', error: '' },
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    loading: false
}

export default function useUserModalController() {

    const usersContext = useUserContext();
    const uiContext = useUIDisplayControls();
    const { roles, loadingRoles: rolesLoading } = useFetchRoles();
    const [formData, setFormData] = useState<FormState>(initialFormData);
    const [loading, setLoading] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

    const setField = (field: keyof FormState, value: string) => {
        if (field === 'loading') return;
        setFormData(prev => ({
            ...prev,
            [field]: { value, error: '' }
        }));
    }

    const setName = (value: string) => setField('name', value);
    const setLastname = (value: string) => setField('lastname', value);
    const setPhone = (value: string) => setField('phone', value);
    const setAddress = (value: string) => setField('address', value);
    const setEmail = (value: string) => setField('email', value);
    const setPassword = (value: string) => setField('password', value);

    const mapZodErrorsToForm = (error: ZodError) => {
        setFormData(prev => ({
            ...prev,
            name: { value: prev.name.value, error: error.issues.find(i => i.path[0] === 'name')?.message ?? '' },
            lastname: { value: prev.lastname.value, error: error.issues.find(i => i.path[0] === 'lastname')?.message ?? '' },
            phone: { value: prev.phone.value, error: error.issues.find(i => i.path[0] === 'phone')?.message ?? '' },
            address: { value: prev.address.value, error: error.issues.find(i => i.path[0] === 'address')?.message ?? '' },
            email: { value: prev.email.value, error: error.issues.find(i => i.path[0] === 'email')?.message ?? '' },
            password: { value: prev.password.value, error: error.issues.find(i => i.path[0] === 'password')?.message ?? '' },
            loading: false
        }));
    }

    const updateUser = async (id: string, data: any) => {
        try {
            setLoading(true);

            const response = await api.put(`/api/user/${id}`, {
                ...data
            });

            usersContext.setUsers(prev => prev.map(user => user.id === Number(id) ? response.data : user));
            setFormData(initialFormData);
            usersContext.setModal({ open: false, type: 'add', user: null });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }

    const addUser = async (data: any) => {
        try {
            const response = await api.post(`/api/user`, {
                ...data
            });
            
            usersContext.setUsers([...usersContext.users, response.data]);
            setFormData(initialFormData);
            usersContext.setModal({ open: false, type: 'add', user: null });
        } catch (error) {
            throw error;
        }
    }

    const handleClose = () => {
        usersContext.setModal({ open: false, type: 'add', user: null });
        setFormData(initialFormData);
        setSelectedRoles([]);
    }

    const handleUpdateUserRoles = async () => {
        try {
            setLoading(true);

            // validate roles payload
            AssignRolesSchema.parse({ roles: selectedRoles });

            const response = await api.put(`/api/user/${usersContext.modal.user.id}/role`, {roles: selectedRoles});
            usersContext.setModal({ open: false, type: 'assignRole', user: null });
            uiContext.setSnackbar({ open: true, message: 'Roles updated successfully', severity: 'success' });
            setSelectedRoles([]);
        } catch (error) {
            if (error instanceof ZodError) {
                uiContext.setSnackbar({ open: true, message: error.issues[0]?.message ?? 'Datos inválidos', severity: 'error' });
            } else {
                handleApiError(error, uiContext);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const payload = {
                name: formData.name.value,
                lastname: formData.lastname.value,
                phone: formData.phone.value,
                address: formData.address.value,
                email: formData.email.value,
                password: formData.password.value,
            };

            if (usersContext.modal.type === 'add') {
                UserCreateSchema.parse(payload);
                await addUser(payload);
                uiContext.setSnackbar({ open: true, message: 'User added successfully', severity: 'success' });
            } else {
                UserUpdateSchema.parse(payload);
                await updateUser(usersContext.modal.user.id, payload);
                uiContext.setSnackbar({ open: true, message: 'User updated successfully', severity: 'success' });
            }

        } catch (error) {
            if (error instanceof AxiosError) {
                handleApiError(error, uiContext);
                setFormData(prev => ({
                    ...initialFormData,
                    loading: false
                }));
            } else if (error instanceof ZodError) {
                mapZodErrorsToForm(error);
            } else {
                uiContext.setSnackbar({ open: true, message: 'Error creating/updating user', severity: 'error' });
            }
        } finally {
            setLoading(false);
        }
    }

    const getUserRoles = async (id: string) => {
        try {
            usersContext.setLoadingModal(true);
            const roles = await api.get(`/api/user/${id}/role`);
            setSelectedRoles(roles.data.map((role: Role) => role.id.toString()));
        } catch (error) {
            handleApiError(error, uiContext);
        } finally {
            usersContext.setLoadingModal(false);
        }
    }

    useEffect(() => {
        if (usersContext.modal.user) {
            if (usersContext.modal.type === 'assignRole') {
                getUserRoles(usersContext.modal.user.id);
            } else {
                const user = usersContext.modal.user as any;
                setFormData({
                    name: { value: user.name ?? '', error: '' },
                    lastname: { value: user.lastname ?? '', error: '' },
                    phone: { value: user.phone ?? '', error: '' },
                    address: { value: user.address ?? '', error: '' },
                    email: { value: user.email ?? '', error: '' },
                    password: { value: '', error: '' },
                    loading: false
                });
            }
        }
    }, [usersContext.modal.user]);


    return {
        formData,
        setFormData,
        setName,
        setLastname,
        setPhone,
        setAddress,
        setEmail,
        setPassword,
        updateUser,
        addUser,
        handleClose,
        handleSubmit,
        loading,
        selectedRoles,
        setSelectedRoles,
        roles,
        rolesLoading,
        handleUpdateUserRoles
    }
}