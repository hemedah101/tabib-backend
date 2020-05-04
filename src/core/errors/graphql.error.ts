import { ApolloError } from 'apollo-server-core';

export class BadRequestError extends ApolloError {
  constructor(message: string, properties?: { [key: string]: any }) {
    super(message, 'BAD_REQUEST_ERROR', properties);
    Object.defineProperty(this, 'name', { value: 'BadRequestError' });
  }
}

export class NotFoundError extends ApolloError {
  constructor(type: string, properties?: { [key: string]: any }) {
    const message = `${type} not found`;
    super(message, 'NOT_FOUND_ERROR', properties);
    Object.defineProperty(this, 'name', { value: 'NotFoundError' });
  }
}

export class ConflictError extends ApolloError {
  constructor(message: string, properties?: { [key: string]: any }) {
    super(message, 'CONFLICT_ERROR', properties);
    Object.defineProperty(this, 'name', { value: 'ConflictError' });
  }
}

export class UnauthorizedError extends ApolloError {
  constructor(message?: string, properties?: { [key: string]: any }) {
    super(message || 'Unauthorized', 'UNAUTHORIZED_ERROR', properties);
    Object.defineProperty(this, 'name', { value: 'UnauthorizedError' });
  }
}

export class ForbiddenError extends ApolloError {
  constructor(message?: string, properties?: { [key: string]: any }) {
    super(message || 'Forbidden', 'FORBIDDEN_ERROR', properties);
    Object.defineProperty(this, 'name', { value: 'ForbiddenError' });
  }
}

export class NotImplementedError extends ApolloError {
  constructor(message?: string, properties?: { [key: string]: any }) {
    super(message || 'Not Implemented', 'NOT_IMPLEMENTED_ERROR', properties);
    Object.defineProperty(this, 'name', { value: 'NotImplementedError' });
  }
}

export class PayloadTooLargeError extends ApolloError {
  constructor(message: string, properties?: { [key: string]: any }) {
    super(message, 'PAYLOAD_TOO_LARGE_ERROR', properties);
    Object.defineProperty(this, 'name', { value: 'PayloadTooLargeError' });
  }
}

export class ValidationError extends ApolloError {
  constructor(message: string, properties?: { [key: string]: any }) {
    super(message, 'VALIDATION_ERROR', properties);
    Object.defineProperty(this, 'name', { value: 'ValidationError' });
  }
}
