import { Routes } from "@angular/router";
import { RegisterComponent } from "./components/auth/register/register.component";
import { EditComponent } from "./components/auth/edit/edit.component";
import { UsersComponent } from "./components/auth/users/users.component";
import { ScheduleComponent } from "./components/schedule/schedule.component";
import { ScheduleDetailsComponent } from "./components/schedule/schedule-details/schedule-details.component";
import { LoanComponent } from "./components/loan/loan.component";
import { NewLoanComponent } from "./components/loan/new-loan/new-loan.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { AuthGuard } from "./auth.guard";

export const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "users/register",
    component: RegisterComponent,
  },
  { path: "edit", component: EditComponent },
  { path: "users", component: UsersComponent },
  { path: "loans", component: LoanComponent},
  {
    path: "loans/new-loan",
    component: NewLoanComponent,
  },
  { path: "schedule", component: ScheduleComponent },
  {
    path: "schedule/details/:id",
    component: ScheduleDetailsComponent,
  },
];
