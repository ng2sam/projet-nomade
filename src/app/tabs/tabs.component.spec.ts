import { ComponentFixture, async }    from '@angular/core/testing';
import { TestUtils }                  from '../../test';
import { AboutPage, ContactPage, HomePage  } from './pages';
import { TabsPage } from './tabs';


let fixture: ComponentFixture<TabsPage> = null;
let instance: any = null;

describe('App component', () => {

  beforeEach(async(() => TestUtils.beforeEachCompiler([AboutPage, ContactPage, HomePage]).then(compiled => {
    fixture = compiled.fixture;
    instance = compiled.instance;
    fixture.detectChanges();
  })));

  afterEach(() => {
    fixture.destroy();
  });

  it('initialises', () => {
    expect(instance).toBeTruthy();
  });

});