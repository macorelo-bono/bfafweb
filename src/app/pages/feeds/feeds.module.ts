import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedsPageRoutingModule } from './feeds-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { FeedsPage } from './feeds.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FeedsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [FeedsPage]
})
export class FeedsPageModule {}
