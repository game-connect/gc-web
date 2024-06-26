export interface CreateChannel {
    types:  string;
    status: number;
    items: {
        channel_key: string;
        room_key:    string;
        name:        string;
        description: string;
        type:        string;
        message:     string;
    };
}
