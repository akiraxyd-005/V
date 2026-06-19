
    body {
        background: linear-gradient(135deg, #0a0f1e 0%, #0c1222 100%);
        font-family: 'Segoe UI', 'Poppins', system-ui, -apple-system, sans-serif;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

    .container {
        max-width: 550px;
        width: 100%;
        background: rgba(18, 25, 45, 0.7);
        backdrop-filter: blur(10px);
        border-radius: 2rem;
        border: 1px solid rgba(255, 255, 255, 0.08);
        overflow: hidden;
        box-shadow: 0 25px 45px -12px rgba(0, 0, 0, 0.5);
    }

    .header {
        background: linear-gradient(95deg, #6b21a5 0%, #d946ef 100%);
        padding: 1.5rem;
        text-align: center;
    }

    .header h1 {
        font-size: 1.8rem;
        font-weight: 700;
        letter-spacing: -0.5px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: white;
    }

    .header p {
        color: rgba(255,255,255,0.85);
        font-size: 0.85rem;
        margin-top: 8px;
    }

    .badge {
        background: rgba(0,0,0,0.3);
        display: inline-block;
        padding: 4px 10px;
        border-radius: 40px;
        font-size: 0.7rem;
        font-weight: 500;
        margin-top: 8px;
    }

    .content {
        padding: 2rem 1.5rem;
    }

    .server-selector {
        background: #0f1425;
        border-radius: 1.2rem;
        padding: 1rem;
        margin-bottom: 1.8rem;
        border: 1px solid #1e2a3e;
    }

    .server-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
        gap: 10px;
        margin-top: 12px;
    }

    .server-btn {
        background: #0a0f1a;
        border: 1px solid #1f2a3e;
        padding: 8px 5px;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #b9c3d4;
    }

    .server-btn.active {
        background: linear-gradient(95deg, #6b21a5, #c026d3);
        border-color: #c241ff;
        color: white;
        box-shadow: 0 0 8px rgba(192, 38, 211, 0.4);
    }

    .input-group {
        margin-bottom: 1.8rem;
    }

    .input-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #cbd5e6;
        font-size: 0.85rem;
    }

    .phone-input {
        display: flex;
        background: #0f1425;
        border-radius: 1rem;
        border: 1px solid #1e2a3e;
        overflow: hidden;
    }

    .country-code {
        background: #1a1f32;
        padding: 0 15px;
        display: flex;
        align-items: center;
        font-weight: 600;
        color: white;
        border-right: 1px solid #2d3a4e;
    }

    .phone-input input {
        flex: 1;
        background: transparent;
        border: none;
        padding: 14px 15px;
        color: white;
        font-size: 1rem;
        outline: none;
    }

    .generate-btn {
        width: 100%;
        background: linear-gradient(95deg, #2563eb, #7c3aed);
        border: none;
        padding: 14px;
        border-radius: 1.2rem;
        font-weight: 700;
        font-size: 1rem;
        color: white;
        cursor: pointer;
        transition: all 0.2s;
        margin-bottom: 1.5rem;
    }

    .generate-btn:active {
        transform: scale(0.97);
    }

    .code-box {
        background: #0b0f1a;
        border-radius: 1rem;
        padding: 1rem;
        text-align: center;
        border: 1px dashed #3b4b6e;
    }

    .code-label {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #7c8db0;
    }

    .code-value {
        font-size: 2.2rem;
        font-weight: 800;
        letter-spacing: 4px;
        font-family: monospace;
        background: #010101;
        padding: 12px;
        border-radius: 14px;
        margin: 12px 0;
        color: #a5f3ff;
        word-break: break-all;
    }

    .copy-btn {
        background: #1e2a3a;
        border: none;
        padding: 8px 20px;
        border-radius: 30px;
        color: white;
        font-size: 0.75rem;
        cursor: pointer;
    }

    .footer {
        font-size: 0.7rem;
        text-align: center;
        color: #5a6e8a;
        padding: 1rem;
        border-top: 1px solid #1a2538;
    }

    .toast {
        position: fixed;
        bottom: 25px;
        left: 50%;
        transform: translateX(-50%);
        background: #1e293b;
        color: #bbf0ff;
        padding: 8px 18px;
        border-radius: 50px;
        font-size: 0.8rem;
        z-index: 999;
        opacity: 0;
        transition: 0.2s;
    }

    @media (max-width: 480px) {
        .server-grid {
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
        }
        .code-value {
            font-size: 1.5rem;
            letter-spacing: 2px;
        }
    }
</style>