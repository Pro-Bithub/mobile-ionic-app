import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.page.html',
  styleUrls: ['./register-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class RegisterPagePage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
  ) {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }
  ngOnInit() {
  }
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    // Logique d'inscription à implémenter ici
    // Vous pouvez accéder aux valeurs du formulaire via this.registerForm.value
    const username = this.registerForm.value.username;
    const password = this.registerForm.value.password;

    localStorage.setItem('username', username);
    localStorage.setItem('password',password);
    localStorage.setItem('hasPrivilege', false.toString());

    // Rediriger vers une autre page après l'inscription
    this.navCtrl.navigateForward('/liste-signalements');
  }
}
