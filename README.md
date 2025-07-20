# Fireworks Mini Ground

A minimal playground for testing and interacting with Fireworks AI models. Built with Next.js, TypeScript, and Tailwind CSS.

## How to Run Locally

1. **Clone and install:**
   ```bash
   git clone <repository-url>
   cd fireworks-mini-ground
   npm install
   ```

2. **Set up your API key:**
   ```bash
   cp env.example .env.local
   ```
   
   Add your Fireworks API key to `.env.local`:
   ```
   FIREWORKS_API_KEY=your_api_key_here
   ```
   
   Get your API key: [https://app.fireworks.ai/settings/users/api-keys](https://app.fireworks.ai/settings/users/api-keys)

3. **Start the dev server:**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000)

## Hosted Version

[**Live Demo**](https://fireworks-mini-ground.vercel.app/)

## Example Prompts

Here are some example prompts I used while building this project:

**For generating the initial structure:**
```
"Create a Next.js playground app for testing Fireworks AI models with real-time chat interface, model selection dropdown, and clean UI using shadcn/ui components."
```

**For adding features:**
```
"Add timing analytics to show response time and token counts, with a toggle button to show/hide this information."
```

**For improving the chat experience:**
```
"Implement streaming responses with Server-Sent Events so users can see the AI response being generated in real-time."
```

**For project structure and organization:**
```
"Refactor this into a custom React hook called useModels that handles fetching available models, loading states, and error handling. Make it reusable across components."
```

**For component architecture:**
```
"Split the chat functionality into separate components: ChatContainer for the message list, ChatMessage for individual messages, and ChatInput for the input form. Use proper TypeScript interfaces."
```

**For API service layer:**
```
"Create an API service class that abstracts all Fireworks API calls with proper error handling, request/response typing, and consistent endpoint management."
```

**For naming conventions and cleanup:**
```
"Review the codebase and suggest better naming conventions for components, hooks, and types. Ensure all file names follow consistent patterns and improve code readability."
```

## Design Decisions

**Tech Stack Choices:**
- **Next.js 15**: Full-stack framework for both frontend and API routes
- **TypeScript**: Type safety and better developer experience  
- **Tailwind CSS + shadcn/ui**: Rapid UI development with consistent design system
- **Server-Sent Events**: Real-time streaming without WebSocket complexity

**Architecture:**
- API routes proxy Fireworks calls to keep API keys secure
- Model selector manages its own state via custom hook
- Streaming responses for better UX during long completions
- Simple component structure with clear separation of concerns

## Potential Improvements

- [ ] **Unit Testing**: Add comprehensive test coverage for components, hooks, and API routes
- [ ] **Conversation History**: Persist chats in localStorage or database with session management
- [ ] **Design Improvements**: Better visual hierarchy, loading animations, and user feedback
- [ ] **Mobile Responsive**: Optimize layout and interactions for smaller screens
- [ ] **Image Support**: Add image input support and proper image rendering in chat messages
