import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.page.html',
  styleUrls: ['./search-users.page.scss'],
  standalone: false
})
export class SearchUsersPage implements OnInit {
  users: any[] = [];
  page: number = 1;
  limit: number = 10;
  query: string = '';
  hasHoreUsers: boolean = true;

  constructor(
    private userService: UserService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  async loadUsers(event?: any){
    const currentUser = await this.storage.get('user');
    const followingUers = currentUser.following_users || [];
    this.userService.listUsers(this.page, this.limit, this.query).then(
      (data: any) => {
        if (data.users.length > 0){
          const updateUsers = data.users.map((user: any) => ({
            ...user,
            is_following: followingUers.some((followedUser: any) => followedUser.id == user.id),
          }));

          this.users = [...this.users, ...data.users];
          this.page++;
        }else{
          this.hasHoreUsers = false;
        }
        if (event){
          event.target.complete();
        }
      }
    ).catch(
      (error) => {
        console.log(error);
        event.target.complete();
      }
    );
  }

  searchUsers(event?: any){
    this.query = event.target.value || '';
    this.page = 1;
    this.users = [];
    this.hasHoreUsers = true;
    this.loadUsers();
  }

  follow(user_id: any){
    console.log('follow', user_id);
  }  

  unfollow(user_id: any){
    console.log('unfollow', user_id);
  }
  toggleFollow(user: any){
    if (user.is_following){
      this.unfollow(user.id);
    }else{
      this.follow(user.id);
    }
  }

}
