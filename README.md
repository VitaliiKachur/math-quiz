# Math Quiz

Math Quiz is a React/Vite educational application for practicing arithmetic tasks with configurable time, difficulty and operators.

## Tech Stack

- React 19
- Vite 7
- Zustand
- React Hook Form
- Yup
- Storybook
- JSDoc

## Configuration

Game settings are stored locally in the browser:

- duration: 5-600 seconds;
- difficulty: `easy`, `medium`, `hard`, `expert`;
- operators: `+`, `-`, `*`, `/`;
- local storage key: `math-quiz-storage`;
- cookie consent key: `math-quiz-cookie-consent`.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm run storybook
npm run build-storybook
npm run docs
npm run license:report
```

## Documentation

Local generated documentation is created with JSDoc:

```bash
npm run docs
```

The generated site is written to `docs/`. Additional instructions for the required local documentation video are in [DOCUMENTATION.md](DOCUMENTATION.md).

## Storybook

Storybook documents two components:

- `Button` as a base component;
- `SettingsForm` as a complex component.

Run it with:

```bash
npm run storybook
```

## GDPR and Privacy

The application includes a GDPR-oriented cookie popup with consent groups for necessary storage, preferences and analytics. Privacy details and user restrictions are described in [PRIVACY_POLICY.md](PRIVACY_POLICY.md).

## License

This project is released under the [MIT License](LICENSE). Dependency license verification is stored in [LICENSE_REPORT.md](LICENSE_REPORT.md).

## Author

Vttalii_Kachur  
vtk241_kvv@student.ztu.edu.ua
