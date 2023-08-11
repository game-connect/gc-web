import { RoomCreate } from "@/domain/entity/room/roomCreate"
import { ApiClient } from "@/infra/api/apiClient";

export default defineEventHandler(async (event) => {
    const apiClient = new ApiClient(); 
    const config = useRuntimeConfig();

    const req = event.req
    const authorizationHeader = req.headers.authorization
    const userKey: string = event.context.params?.userKey;
    const body = await readBody(event)
    
    const response: RoomCreate = await apiClient.post(config.public.GcServerUrl + "/room/" + userKey + "/create_room", body, authorizationHeader);

    return response
})
