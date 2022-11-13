import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { UsersDataService } from './service/users-data.service';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angulartask_1';
 public sortDir = 1;//1= 'ASE' -1= DSC

 public srchTxt:any;
  public users: any;
   public currentPage=1;

  constructor(private userData: UsersDataService) {
    // this.sortArr('name');

  }
  ngOnInit() {
    this.allUsers(this.currentPage);
}

previous(e:any){
e.preventDefault();
this.currentPage--;
console.log(this.currentPage);
this.allUsers(this.currentPage)


}
next(e:any){
  e.preventDefault();
  this.currentPage++;
  console.log(this.currentPage);
  this.allUsers(this.currentPage)
}


  
  allUsers(pageCount?:any) {
   let page = pageCount;
    this.userData.users({page:page}).subscribe((res: any) => {
      this.users = res.data
    })
  }

  get usersFilteredList(){
    if(!this.srchTxt) return this.users;
    return this.users.filter((resp: any) => ((resp.name).toUpperCase().indexOf(this.srchTxt.toUpperCase()) > -1));
  }

  onSortClick(event:any) {
    let target = event.currentTarget,
      classList = target.classList;
    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir=-1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir=1;
    }
    this.sortArr('name');
  }

  sortArr(colName:any){
    this.users.sort((a:any,b:any)=>{
      a= a[colName].toLowerCase();
      b= b[colName].toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }
 

}
