import { ApiClient } from "@/infra/api/apiClient"
import { ListRoom } from "@/domain/entity/room/listRoom"
import { ListRoomUser } from "@/domain/entity/room/listRoomUser"
import { CreateRoom } from "@/domain/entity/room/createRoom"
import { JoinRoom } from "@/domain/entity/room/joinRoom"

export class FetchRoom {
    private apiClient: ApiClient

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    // listRoom ルーム一覧
    async listRoom(userKey: string): ListRoom {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListRoom = await this.apiClient.get(config.public.GcWebUrl + "/api/room/" + userKey + "/list_room", access_token.value)
        
        return response
    }

    // listRoomUser ルーム一覧
    async listRoomUser(userKey: string, roomKey: string): ListRoomUser {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListRoomUser = await this.apiClient.get(config.public.GcWebUrl + "/api/room/" + userKey + "/list_room_user/" + roomKey, access_token.value)
        
        return response
    }

    // searchRoom ルーム検索
    async searchRoom(userKey: string, name: string, genre: string, game: string): ListRoom {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: ListRoom = await this.apiClient.get(config.public.GcWebUrl + "/api/room/" + userKey + "/search_room?name=" + name + "&genre=" + genre + "&game=" + game, access_token.value)
        
        return response
    }

    // createRoom ルーム作成
    async createRoom(body: any, userKey: string): CreateRoom {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: CreateRoom = await this.apiClient.post(config.public.GcWebUrl + "/api/room/" + userKey + "/create_room", body, access_token.value)

        return response
    }

    // joinRoom ルーム参加
    async joinRoom(userKey: string, roomKey: string): JoinRoom {
        const config = useRuntimeConfig();
        const access_token = useCookie('access_token')
        const response: JoinRoom = await this.apiClient.post(config.public.GcWebUrl + "/api/room/" + userKey + "/join_room/" + roomKey, null, access_token.value)

        return response
    }
}
