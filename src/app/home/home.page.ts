import { Component } from '@angular/core';
import { VaultService } from '../vault.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private vaultService: VaultService) { }

  async lock() {
    await this.vaultService.setData();
    await this.vaultService.lock();
    await this.vaultService.unlock();
  }
}
