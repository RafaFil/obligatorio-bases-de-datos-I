import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { IRolNeg } from 'src/app/interfaces/iRolNeg';
import { IApp } from 'src/app/interfaces/iApp';
import { RequestRoleService } from 'src/app/services/request-role.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-request-role',
  templateUrl: './request-role.component.html',
  styleUrls: ['./request-role.component.css']
})
export class RequestRoleComponent implements OnInit {

  availableRoles : IRolNeg[] = [];
  availableApps : IApp[] = [];

  reqForm = this.fb.group({
    role : [0, Validators.required],
    app : [0, Validators.required]
  })
  reqFormCtrls = this.reqForm.controls;

  constructor(private rrs : RequestRoleService, private fb : FormBuilder, private ls : LoginService) { }

  chkLogin = this.ls.isLoggedIn();

  ngOnInit(): void {
    this.rrs.getApps().subscribe(apps => this.availableApps = apps);

    this.reqForm.get('app')?.valueChanges.subscribe(id => {
      if(id){
      this.rrs.getRolesByApp(id).subscribe(roles => this.availableRoles = roles);
    }
    })
  }

  request(){
    if(this.reqFormCtrls.app.value && this.reqFormCtrls.role.value){
      this.rrs.request(this.reqFormCtrls.app.value, this.reqFormCtrls.role.value)
      .subscribe(resp => {
        if(resp){
          alert('Solicitud de Rol enviada');
        } else if(resp === false){
          alert('Ese aplicativo o Rol ya no existe');
        } else{
          alert('Error al enviar la solicitud');
        }
      });
    }
  }
}
