
# Physics Virtual Lab by XIVIX

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/XIVIX-Official/physics-virtual-lab)](https://github.com/XIVIX-Official/physics-virtual-lab/issues)
[![GitHub forks](https://img.shields.io/github/forks/XIVIX-Official/physics-virtual-lab)](https://github.com/XIVIX-Official/physics-virtual-lab/network)
[![GitHub stars](https://img.shields.io/github/stars/XIVIX-Official/physics-virtual-lab)](https://github.com/XIVIX-Official/physics-virtual-lab/stargazers)

An open-source platform designed to make physics education accessible and engaging for remote learners through interactive, real-time simulations.

![Physics Virtual Lab Screenshot](https://storage.googleapis.com/aistudio-project-images/b48b7890-50b3-4f24-9b63-14917631725b.png)

## 🔬 About The Project

The **Physics Virtual Lab** provides a modern, intuitive, and interactive environment for students and educators to explore complex physics concepts. By visualizing experiments and allowing real-time parameter manipulation, it bridges the gap between theoretical knowledge and practical understanding. The platform is enhanced with an integrated AI Tutor, powered by Google's Gemini API, to offer instant explanations and answer questions, creating a personalized learning experience.

## ✨ Features

- **Interactive Simulations:** Hands-on control over experiment variables.
- **Real-time Visualization:** See the immediate effects of your changes on graphs and animations.
- **AI-Powered Tutor:** Get instant, context-aware explanations for any simulation from our Gemini-powered AI assistant.
- **Wide Range of Topics:** Covering mechanics, electromagnetism, optics, and modern physics.
- **Fully Responsive:** Seamless experience on desktop, tablet, and mobile devices.
- **Open Source:** Free to use, modify, and distribute.

## 🧪 Simulations Included

The lab currently features the following interactive simulations:

-   **Simple Pendulum:** Investigate the relationship between length, gravity, and the period of a pendulum.
-   **Projectile Motion:** Analyze the trajectory of projectiles by adjusting launch angle, velocity, and gravity.
-   **Spring-Mass System:** Explore simple harmonic motion, damping, and energy conservation.
-   **Electric Field:** Visualize electric field lines by placing positive and negative charges.
-   **Double-Slit Experiment:** Discover wave-particle duality and interference patterns of light.
-   **Special Relativity:** Observe time dilation and length contraction as you approach the speed of light.
-   **Quantum Tunneling:** See the quantum phenomenon of particles tunneling through potential barriers.
-   **RLC Circuit:** Analyze current and voltage behavior in a series RLC circuit with an AC source.

## 💻 Tech Stack

This project is built with a modern frontend stack:

-   **[React](https://react.dev/)**: A JavaScript library for building user interfaces.
-   **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
-   **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
-   **[Recharts](https://recharts.org/)**: A composable charting library built on React components.
-   **[Google Gemini API](https://ai.google.dev/)**: Powers the intelligent AI Physics Tutor.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   A modern web browser.
-   A local web server to serve the files. The `live-server` VS Code extension or `python -m http.server` are great options.
-   A configured **Google Gemini API Key**.

### Installation & Setup

1.  **Clone the repo**
    ```sh
    git clone https://github.com/XIVIX-Official/physics-virtual-lab.git
    ```
2.  **Navigate to the project directory**
    ```sh
    cd physics-virtual-lab
    ```
3.  **Set up the Gemini API Key**
    The AI Tutor requires a Google Gemini API key to function. The application is designed to securely access this key from a `process.env.API_KEY` environment variable, which must be made available to the browser context by your hosting platform or local server setup.

4.  **Run the application**
    Serve the project folder using a local web server and open the `index.html` file in your browser.

## 📜 License

Distributed under the MIT License. See `LICENSE.txt` for more information.

## 📧 Contact

XIVIX - [https://github.com/XIVIX-Official](https://github.com/XIVIX-Official)

Project Link: [https://github.com/XIVIX-Official/physics-virtual-lab](https://github.com/XIVIX-Official/physics-virtual-lab)

---
**Powered by XIVIX**