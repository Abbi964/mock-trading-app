import { DataSource } from 'typeorm';
import { DB_CONFIG } from './db-config';

export default class DBModule {
     public static dbInstance: DataSource = new DataSource(DB_CONFIG);

     public static async register(): Promise<void> {
          try {
               await this.dbInstance.initialize(); 
               console.info('connection established');
          } catch (error) {
               console.info('connection to db unsuccessful', error);
               throw new Error('failed to establish connection with db!');
          }
     }
}