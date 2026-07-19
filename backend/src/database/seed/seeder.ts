export abstract class Seeder {
  protected abstract readonly seederName: string;

  abstract run(): Promise<void>;
  abstract down(): Promise<void>;

  protected log(message: string): void {
    console.log(`📦 [${this.seederName}] ${message}`);
  }

  protected success(message: string): void {
    console.log(`✅ [${this.seederName}] ${message}`);
  }

  protected error(message: string): void {
    console.error(`❌ [${this.seederName}] ${message}`);
  }
}