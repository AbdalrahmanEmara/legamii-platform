# Legamii — `src/lib` Handoff

## ما اتعمل

### `api/client.js` ✅

- بيقرأ الـ base URL من `NEXT_PUBLIC_API_BASE_URL`
- فيه function واحدة `request()` بتتشارك بين كل الـ methods
- بيبني الـ URL بـ `new URL()` عشان يدعم query params
- بيتعامل مع الـ errors ويرجع message من الـ backend لو موجودة
- معمول عليه `import "server-only"` — مش هيشتغل في client components

الـ `api` object بيعرض 4 methods:

```js
api.get(endpoint, { params })
api.post(endpoint, body)
api.patch(endpoint, body)
api.delete(endpoint)
```

---

### `api/endpoints.js` ✅ (جزئي)

الـ paths بس — من غير base URL أو `process.env`.

**القواعد:**

- Static URL → plain string
- Dynamic URL → arrow function
- Naming: `list / byId / update / delete / describeSpecialAction`

**المكتمل:**

```
school   → list, byId, update, delete
quiz     → list, start, byId, finish, questions, question, solve
```

**المتبقي لك:**

```
teacher         → {}
student         → {}
subject         → {}
grade           → {}
cloudinary      → {}
student_contest → {}
```

راجع الـ API docs عشان تكمل كل domain.

---

### `services/quiz.service.js` ✅

```
getQuizList()
startQuiz(body)
getQuizById(quiz_id)
finishQuiz(quiz_id, body)
getQuestions(quiz_id)
getQuestion(quiz_id, question_id)
solveQuestion(quiz_id, question_id, body)
```

---

## القواعد المتفق عليها

|القاعدة|التفاصيل|
|---|---|
|`server-only`|كل service لازم يبدأ بـ `import "server-only"`|
|الـ services|بتستخدم `api` و `ENDPOINTS` بس — مش `fetch` مباشرة|
|الـ components|بتستدعي الـ services بس — مش `api` مباشرة|
|الـ body|بيتبعت كـ object واحد من الـ component — الـ service ماشيش تفكك جواها|
|Cloudinary|استثناء وحيد — بيستخدم `fetch` مباشرة لأنه `multipart/form-data` مش JSON|

---

## المتبقي

1. كمل الـ `endpoints.js` للـ domains اللي فاضلة
2. اعمل service لكل domain
3. اعمل `services/index.js` في الآخر يعمل re-export لكل الـ services