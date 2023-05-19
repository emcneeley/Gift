import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { Pop } from "../utils/Pop.js"
import { api } from "./AxiosService.js"

class GiftsService {
    async removeGift(id) {
        const res = await api.delete('/api/gifts/' + id)
        AppState.gifts = AppState.gifts.filter(g => g.id != id)


    }
    async makeGift(formData) {
        const res = await api.post('/api/gifts', formData)
        // console.log(res.data)
        const newGift = new Gift(res.data)
        AppState.gifts.unshift(newGift)
        AppState.emit('gifts')
    }
    async openGift(id) {
        const gift = AppState.gifts.find(g => g.id == id)
        // @ts-ignore
        gift.opened = !gift.opened
        const res = await api.put('/api/gifts/' + id, gift)
        console.log('flipp de bool', res.data)
        let foundIndex = AppState.gifts.findIndex(g => g.id == id)
        console.log('index of the gift', foundIndex)
        AppState.gifts.splice(foundIndex, 1, new Gift(res.data))
        AppState.emit('gifts')
    }
    async getGiftsFromApi() {
        const res = await api.get('/api/gifts')
        console.log(res.data)
        AppState.gifts = res.data.map(g => new Gift(g))


    }



}

export const giftsService = new GiftsService()
