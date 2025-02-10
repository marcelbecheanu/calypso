import * as fs from 'fs';
import * as path from 'path';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      synchronize: true,
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'calypso',
      password: 'calypso1234',
      database: 'calypso',
      entities: [...findEntityFiles(path.normalize(`${__dirname}/../../`))],
      autoLoadEntities: true,
      logging: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}

/**
 * Recursively finds all entity files in the given directory and its subdirectories.
 * @param dir - The directory to search for entity files.
 * @param fileList - An optional parameter to accumulate found files (used internally for recursion).
 * @returns A list of paths to entity files.
 */
function findEntityFiles(dir: string, fileList: string[] = []): string[] {
  // Read the contents of the directory
  const files = fs.readdirSync(dir);

  // Iterate through each file/folder in the directory
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // If it's a directory, recursively search it
      findEntityFiles(filePath, fileList);
    } else if (
      // Check if the file ends with .entity.ts or .entity.js
      file.endsWith('.entity.ts') ||
      file.endsWith('.entity.js')
    ) {
      // Add the file to the list if it matches
      fileList.push(filePath);
    }
  });

  return fileList;
}
