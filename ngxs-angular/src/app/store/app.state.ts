import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {DataService} from "../services/data.service";
import {AddUsers, DeleteUsers, GetUsers, UpdateUsers} from "./app.action";
import {tap} from "rxjs";


export class UserStateModel {
  users: any;
}

@State<UserStateModel>({
  name: 'appstate',
  defaults: {
    users: []
  }
})
@Injectable()
export class AppState {

  constructor(private data: DataService) {
  }

  @Selector()
  static selectStateData(state: UserStateModel) {
    return state.users
  }

  @Action(GetUsers)
  getDataFromService(ctx: StateContext<UserStateModel>) {
    return this.data.fetchUsers().pipe(
      tap(returnData => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          users: returnData
        })
      })
    )
  }

  @Action(AddUsers)
  addDataForService(ctx: StateContext<UserStateModel>, {payload} : AddUsers) {
    return this.data.addUsers(payload).pipe(
      tap(returnData => {
        const state = ctx.getState();
        ctx.patchState({
          users: [...state.users, returnData]
        })
      })
    )
  }

  @Action(UpdateUsers)
  updateUsers(ctx: StateContext<UserStateModel>, {payload, id,i}: UpdateUsers) {
    this.data.updateUser(payload, id).pipe(
      tap(returnData => {
        const state = ctx.getState();
        const usersList = [...state.users];
        usersList[i] = payload;
        ctx.setState({
          ...state,
          users: usersList
        })
      })
    )
  }

  @Action(DeleteUsers)
  deleteUsers(ctx: StateContext<UserStateModel>, {id}: DeleteUsers) {
    const state = ctx.getState();
    const filteredArrayy = state.users.filter((contents: any) => contents.id !== id);
    ctx.setState({
      ...state,
      users: filteredArrayy
    })
  }
}

