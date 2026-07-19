// Models
export { User, IUserDocument, UserRole } from './models/user.model.js';

// Repositories
export { UserRepository, userRepository } from './repositories/user.repository.js';
export type { CreateUserData, UpdateUserData, FindUserOptions } from './repositories/user.repository.js';

// DTOs
export * from './dtos/auth.dto.js';

// Schemas
export * from './schemas/auth.schema.js';

// Validators
export { validate, validateBody, validateQuery, validateParams } from './validators/auth.validator.js';

// Services
export { AuthService, authService } from './services/auth.service.js';

// Controllers
export * from './controllers/auth.controller.js';

// Routes
export { default as authRoutes } from './routes/auth.routes.js';