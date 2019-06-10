import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
  public static readonly emailRegExp = /^[\w ]+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.[\w ]{2,})+$/;
}
