import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Fullstack Boilerplate Core API')
    .setDescription(
      'Production REST API with Better-Auth, Prisma ORM, Role-based Access Control, and Clean Modular Architecture.',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('Health', 'System and database health checks')
    .addTag('Users', 'User profile management, self-update and admin controls')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
}
