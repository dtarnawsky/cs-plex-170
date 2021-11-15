import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { BrowserVault, Device, DeviceSecurityType, IdentityVaultConfig, Vault, VaultType } from '@ionic-enterprise/identity-vault';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VaultService {

  config: IdentityVaultConfig = {
    key: 'io.ionic.plex-170',
    type: VaultType.DeviceSecurity,
    deviceSecurityType: DeviceSecurityType.Biometrics,
    lockAfterBackgrounded: null,
    shouldClearVaultAfterTooManyFailedAttempts: false,
    customPasscodeInvalidUnlockAttempts: 10,
    unlockVaultOnLoad: false,
  };

  vault: Vault | BrowserVault;

  constructor(private platform: Platform) {
    this.init();
  }

  async init() {
    this.vault = Capacitor.getPlatform() === 'web' ? new BrowserVault(this.config) : new Vault(this.config);
    this.vault.onConfigChanged(() => {
      console.log('Vault configuration was changed', this.config);
    });
    this.vault.onLock(() => {
      console.log('Vault was locked');
    });
    this.vault.onUnlock(() => {
      console.log('Vault was unlocked');
    });
    this.vault.onError((err) => {
      console.log('Vault error', err);
    });

  }

  async lock() {
    try {
      await this.vault.lock();
    } catch (err) {
      console.error('vault.service.ts lock()', err);
    }
  }

  async unlock() {
    try {
      await this.vault.unlock();
    } catch (err) {
      const msg = (typeof err == "object") ? JSON.stringify(err) : err;
      console.error('vault.service.ts unlock()', msg);
    }
  }

  async getData() {
    console.log("Get Data....");
    const data = await this.vault.getValue("blar");
    console.log("Get Data", data);
  }

  async setData() {
    try {
      console.log('Setting data...');
      await this.vault.setValue("blar", "test");
      console.log('Data is set');
    } catch (err) {
      console.error('vault.service.ts setData()', err);
    }
  }
}
