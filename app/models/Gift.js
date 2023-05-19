import { AppState } from "../AppState.js"



export class Gift {
    constructor(data) {
        this.tag = data.tag
        this.url = data.url
        this.opened = data.opened || false
        this.creatorId = data.creatorId
        this.id = data.id

    }


    get GiftTemplate() {
        debugger
        if (!this.opened) {
            return `
          <div class="col-3 card m-2">
              <img onclick="app.GiftsController.openGift('${this.id}')"class="image-fluid" src="https://www.verdict.co.uk/wp-content/uploads/2018/11/shutterstock_712915198-e1542045457155.jpg" alt="${this.tag}">
              <p>${this.tag}</p>
          </div>
        `
            // @ts-ignore
        } else if (this.opened && this.creatorId == AppState.account.id) {
            return `
            <div class="col-3 card m-2">
                <img src="${this.url}" alt="${this.tag}">
                <p>${this.tag}</p>
                <button onclick="app.GiftsController.removeGift('${this.id}')"class="mb-2 btn btn-danger"><i class="mdi mdi-delete"></i></button>
            </div>
            `
        } else if (this.opened) {
            return `
            <div class="col-3 card m-2">
                <img src="${this.url}" alt="${this.tag}">
                <p>${this.tag}</p>
            </div>
            `
        }
    }



}