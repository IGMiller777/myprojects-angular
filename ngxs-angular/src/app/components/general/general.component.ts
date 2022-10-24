import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {AppState} from "../../store/app.state";
import {AddUsers, DeleteUsers, GetUsers, UpdateUsers} from "../../store/app.action";

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  userForm!: FormGroup;
  userInfo:any[] = [];

  @Select(AppState.selectStateData) userInfo$!: Observable<any>;

  constructor(private store: Store, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [''],
      name: [''],
      username: [''],
      email: [''],
      phone: [''],
      website: ['']
    })

    console.log(this.userInfo$)
    this.store.dispatch(new GetUsers());

    this.userInfo$.subscribe((returnData) => {
      this.userInfo = returnData;
    })
  }

  addUser() {
    this.store.dispatch(new AddUsers(this.userForm.value));
    this.userForm.reset();
  }

  updateUsers(id: any, i: any) {

    const newData = {
      id: 12,
      name: "Siddhesh Thipse",
      username: "iamsid2399",
      email: 'siddheshthipse09@gmail.com',
      phone: '02138-280044',
      website: 'samplewebsite.com'
    }

    this.store.dispatch(new UpdateUsers(newData, id, i));
  }

  deleteUsers(i: any) {
    this.store.dispatch(new DeleteUsers(i));
  }
}
