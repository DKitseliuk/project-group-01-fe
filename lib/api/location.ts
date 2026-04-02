import axios from 'axios';

export type CreateLocationPayload = {
    title: string;
    type: string;
    region: string;
    description: string;
    images: File | null;
};

export type CreateLocationResponse = {
    _id: string;
    title: string;
    type: string;
    region: string;
    description: string;
    images?: string;
};

export const createLocation = async (
    payload: CreateLocationPayload
): Promise<CreateLocationResponse> => {
    const formData = new FormData();

    formData.append('title', payload.title);
    formData.append('type', payload.type);
    formData.append('region', payload.region);
    formData.append('description', payload.description);

    if (payload.images) {
        formData.append('images', payload.images);
    }

    const { data } = await axios.post<CreateLocationResponse>(
        '/locations',
        formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
    );

    return data;
};