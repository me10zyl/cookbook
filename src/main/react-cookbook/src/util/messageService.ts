// messageService.ts
type MessageApi = {
    error: (msg: string, duration?: number) => void;
    success: (msg: string, duration?: number) => void;
};

let messageApi: MessageApi | null = null;

export const setMessageApi = (api: MessageApi) => {
    messageApi = api;
};

export const showError = (msg: string, duration = 2.5) => {
    if (messageApi) {
        messageApi.error(msg, duration);
    } else {
        console.error('messageApi 未初始化', msg);
    }
};

export const showSuccess = (msg: string, duration = 2.5) => {
    if (messageApi) {
        messageApi.success(msg, duration);
    } else {
        console.log('messageApi 未初始化', msg);
    }
};
