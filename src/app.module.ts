import { Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatModule } from './chat/chat.module';
import { RoomModule } from './room/room.module';
import { AuthModule } from './auth/auth.module';
import { ElementModule } from './element/element.module';
import { VersionModule } from './version/version.module';
import { HistoriesModule } from './histories/histories.module';
import { StructureModule } from './structures/structure.module';
import { ContentModule } from './content/content.module';
import { ColaborativeTeamsModule } from './colaborative_teams/colaborative_teams.module';
import { FilesModule } from './files/files.module';
import { DmsModule } from './dms/dms.module';
import { Options } from 'pino-http';
import { LoggerModule as PinoLoggerModule } from 'nestjs-pino';

const LoggerModule = PinoLoggerModule.forRoot({
  pinoHttp: {
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: { singleLine: true, colorize: true },
          level: 'trace',
        },
      ],
    },
  } as Options,
  exclude: [{ method: RequestMethod.ALL, path: '/api/health' }],
});

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    ChatModule,
    RoomModule,
    AuthModule,
    ElementModule,
    VersionModule,
    HistoriesModule,
    StructureModule,
    ContentModule,
    ColaborativeTeamsModule,
    FilesModule,
    DmsModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
