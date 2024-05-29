import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CarouselModule } from 'primeng/carousel';
import { InputNumberModule } from 'primeng/inputnumber';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';

const modules = [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CarouselModule,
    InputTextModule,
    InputNumberModule,
    PasswordModule,
    DividerModule,
    BreadcrumbModule,
    TabMenuModule,
    BadgeModule    
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
})

export class PrimeNgModule {}