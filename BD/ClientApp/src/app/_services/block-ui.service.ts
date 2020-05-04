import { Injectable } from "@angular/core";
declare var mApp: any;

@Injectable()
export class BlockUIService {
    blockUi(uiArea, overlayColor: string = "#000000", type: string = "loader", state: string = "primary", message: string = "Processing...") {
        mApp.block(uiArea, {
            overlayColor: overlayColor,
            type: type,
            state: state,
            message: message
        });
    }

    unblockUi(uiArea) {
        mApp.unblock(uiArea);
    }
}