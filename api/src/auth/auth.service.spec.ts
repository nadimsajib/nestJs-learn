import { ConfigService, ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (configService:ConfigService) => {
            return {
              secret: configService.get('JWT_SECRET'),
              signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN')},
            }
          },
          }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should validate correct credentials', async() => {
    const result = await service.validateUser('john','changeme');
    expect(result.username).toEqual('john');
  });
  it('should invalidate incorrect credentials', async() => {
    const result = await service.validateUser('nadim','changeme');
    expect(result).toBeNull();
  });
});