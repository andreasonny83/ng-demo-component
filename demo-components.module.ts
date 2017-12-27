import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
 } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  IComponentMap,
  MapComponentService,
  mapToken
} from './demo-components.service';

export interface IDemoComponentsConfig {
  declarations?: any;
  componentsMap?: IComponentMap;
}

@NgModule({
  declarations: [
    CommonModule
  ],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class DemoComponentsModule {
  public static forRoot(
    config: IDemoComponentsConfig
  ): ModuleWithProviders {
    return {
      ngModule: DemoComponentsModule,
      providers: [
        MapComponentService,
        { provide: mapToken, useValue: config.componentsMap }
      ]
    }
  }

  constructor(@Optional() @SkipSelf() parentModule: DemoComponentsModule) {
    if (parentModule) {
      throw new Error(
        'DemoComponentsModule is already loaded in your application.');
    }
  }
}
