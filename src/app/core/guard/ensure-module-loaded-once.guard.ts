export class EnsureModuleLoadedOnceGuard {
  constructor(targetModule: any) {
    if (targetModule) {
      throw new Error(
        `${targetModule.constructor.name} is already loaded. Import this module in new AppModule only.`
      );
    }
  }
}
