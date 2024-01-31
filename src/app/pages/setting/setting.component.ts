import { LocalStroageService } from './../../services/local-stroage.service';
import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { AVATAR_CODE, USERNAME } from 'src/app/services/local-stroage.namespace';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: [ './setting.component.css' ],
})
export class SettingComponent implements OnInit {
	public avatar = this.store.get(AVATAR_CODE);
	public username = this.store.get(USERNAME);

	public usernameInput: string = "";

	constructor(
    private store: LocalStroageService,
    private message: NzMessageService,
    private router: Router
	) { }

  ngOnInit() {
    this.usernameInput = this.username;
  }

  validateUsername(): void {
    if (!this.usernameInput) {
      this.message.error('Username can not be empty');
      this.usernameInput = this.username;
    } else if (this.usernameInput !== this.username) {
      this.username = this.usernameInput;
      this.store.set(USERNAME, this.usernameInput);
      this.message.success('Username has been modified');
    }
  }

  private getBase64(img: File, callback: (img: {}) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleAvatarImageChange(info: { file: UploadFile }): void {
    this.getBase64(info.file.originFileObj, (img: string) => {
      this.avatar = img;
      this.store.set(AVATAR_CODE, img);
    });
  }

  goBack(): void {
    this.router.navigateByUrl('/main');
  }
}
