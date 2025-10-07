import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and code are required' },
        { status: 400 }
      );
    }

    // En un caso real, verificarías el código en la base de datos
    // Por ahora, simulamos la verificación
    // En desarrollo, aceptamos cualquier código de 6 dígitos
    if (code.length === 6 && /^\d{6}$/.test(code)) {
      return NextResponse.json({ 
        success: true, 
        message: 'Code verified successfully' 
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid verification code' },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json(
      { error: 'Failed to verify code' },
      { status: 500 }
    );
  }
}
