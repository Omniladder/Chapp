import { Routes } from '@angular/router';
import { LoginScreen } from './login-screen/login-screen';
import { CreateScreen } from './create-screen/create-screen';
import { HomeScreen } from './home-screen/home-screen';
import { ChatScreen } from './chat-screen/chat-screen';
import { NotFoundScreen } from './not-found-screen/not-found-screen';

export const routes: Routes = [
  {
    path: '',
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginScreen
  },
  {
    path: 'creation',
    component: CreateScreen
  },
  {
    path: 'home',
    component: HomeScreen
  },
  {
    path: 'chat',
    component: ChatScreen
  },
  {
    path: '**',
    component: HomeScreen
  }
];
