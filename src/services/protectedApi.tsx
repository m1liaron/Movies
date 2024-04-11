import configuration from "../configuration";

export const protectedApi = {
    async getMessages(accessToken: string) {
        const response = await fetch(`${configuration.protectedApiUrl}/api/messages/protected`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        return response.json();
    },
};