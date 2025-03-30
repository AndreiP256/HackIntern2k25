### Authentification Guard ###

In the Resolver you import GqlAuthGuard
```typescript
import { GqlAuthGuard } from 'src/auth/guard/auth.guard';
```
On the routes that you want to be authentification-protected you use:
```typescript
@UseGuards(GqlAuthGuard)
```

### Roles Guard ###

In the Resolver you import GqlRolesGuard
```typescript
import { GqlRolesGuard } from 'src/auth/guard/roles.guard';
```

On the Routes that you want to protect by user role you use:
```typescript
@UseGuards(GqlRolesGuard)
@Roles(Role.COORDONATOR)
```

The roles are:
- COORDONATOR
- MD
- MEMBRU

### Authoriation Usage in requests ###
In the HTTP header include:
{
  "Authorization": "Bearer <token-here>"
}

### LOGIN Graphql ###

```js
mutation {
  login(authInput: { email: "test0@gmail.com", password: "password" }) {
    access_token
  }
}
```

### Register WorkFlow ###

Register-ul pentru utiliatori noi se face in 2 pasi.
Pas 1: Creerea unui token de inregistrare

```js
mutation{
  createRegisterToken(createTokenDto:{
    email: "ana@gmail.com",
  }) {
    tokenString
  }
}
```
Acest endpoint este DOAR pentru coordonator, doar acesta poate creea tokene de inregistrare. Acestea sunt un sir de 10 caractere UNICE in baza de date.

Pas 2: Inregistrarea unui user
```js
mutation{
  register(regInput: {
    nume: "Andrei",
    prenume: "Prusacov"
    email: "andreia@prusacov.com",
    password: "password123"
    token: "Yi62shuoxe"
  }) {
    id
  }
}
```
In cazul unui token invaid se vor transmite erori.
Dupa o inregistrare cu succes token-ul va fi automat sters din baza de date.