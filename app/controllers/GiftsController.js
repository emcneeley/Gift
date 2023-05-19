import { AppState } from "../AppState.js";
import { giftsService } from "../services/GiftsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawGifts() {
    let template = ''
    AppState.gifts.forEach(g => template += g.GiftTemplate)
    setHTML('gifts', template)
}

export class GiftsController {
    constructor() {
        this.getGiftsFromApi()
        AppState.on('account', this.getGiftsFromApi)
        AppState.on('gifts', _drawGifts)

    }

    async getGiftsFromApi() {
        await giftsService.getGiftsFromApi()

    }

    async openGift(id) {
        await giftsService.openGift(id)
    }

    async makeGift() {
        window.event?.preventDefault()
        const form = window.event?.target
        const formData = getFormData(form)
        console.log("whats inside", formData)

        await giftsService.makeGift(formData)

        // @ts-ignore
        form.reset()

    }


    async removeGift(id) {
        const yes = await Pop.confirm('BYE BYE?')
        if (!yes) { return }
        await giftsService.removeGift(id)
    }
}