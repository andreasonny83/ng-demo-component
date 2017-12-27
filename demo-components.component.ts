import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactory,
  ComponentFactoryResolver
} from '@angular/core';
import {
  MapComponentService,
  IComponentMap
} from './demo-components.service';

@Component({
  selector: 'app-demo',
  template: `<ng-template #target></ng-template>`
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('target', { read: ViewContainerRef })
  public container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;

  constructor(
    private el: ElementRef,
    private resolver: ComponentFactoryResolver,
    private mapComponentService: MapComponentService
  ) {}

  public ngOnInit(): void {
    const target: string = this.el.nativeElement.getAttribute('target');
    const comp: any = this.mapComponentService.getComponentByTag(target);

    if (!comp) {
      throw new Error(
        `No element found. "${target}" is not a valid target name.`);
    }

    const factory: ComponentFactory<any> =
      this.resolver.resolveComponentFactory(comp);
    this.componentRef = this.container.createComponent(factory);
  }

  public ngOnDestroy(): void {
    if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = undefined;
      }
  }
}
