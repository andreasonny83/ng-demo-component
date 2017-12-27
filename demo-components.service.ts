import { Injectable, Inject, InjectionToken } from '@angular/core';

export interface IComponentMap {
  component: any;
  tag: string;
}

export const mapToken: InjectionToken<string> = new InjectionToken('map');

@Injectable()
export class MapComponentService {
  constructor(@Inject(mapToken) private componentMap: IComponentMap[]) {}

  public getComponentByTag(target: string): any {
    const targetComponent: IComponentMap = this.componentMap
      .find((cmp: IComponentMap) => cmp.tag === target);

    return targetComponent && targetComponent.component;
  }
}
