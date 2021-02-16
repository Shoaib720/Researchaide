import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/models/dialog-data';

@Component({
  selector: 'app-modal',
  templateUrl: './confirm-cancel-modal.component.html',
  styleUrls: ['./confirm-cancel-modal.component.css']
})

export class ConfirmCancelModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmCancelModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close(false);
  }

  onYesClick(){
    this.dialogRef.close(true);
  }

}
