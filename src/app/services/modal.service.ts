import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ConfirmCancelModalComponent } from "../shared/modals/confirm-cancel-modal/confirm-cancel-modal.component";

@Injectable({providedIn: 'root'})
export class ModalService{

    public static UPDATE_MESSAGE = "Confirm record update?";
    public static DELETE_MESSAGE = "The record will be deleted permanently! Confirm Delete?"
    public static SESSION_TIMEOUT_MESSAGE = "Your session expired! Please login again!";
    public static REJECT_PAPER_MESSAGE = "Paper will be rejected! Confirm rejection?";
    public static DELETE_PAPER_MESSAGE = "This paper will be deleted permanently! Confirm Delete?"

    constructor(private dialog: MatDialog){}

    public OpenConfirmCancelModal(message: string, isDeleteOp: boolean): Observable<boolean>{
        if(this.dialog.openDialogs.length === 0){
            const dialogRef = this.dialog.open(ConfirmCancelModalComponent, {data: {message: message, isDeleteOperation: isDeleteOp}});
            return dialogRef.afterClosed();
        }
    }
}