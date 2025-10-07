import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    console.log(email);

    if (!email || !email.includes('@')) {
      console.log('Invalid email address');
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Generar código de verificación
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(code);
    // Enviar email con el código
    await sendEmail(
      email,
      'Password Recovery Code',
      `Your password recovery code is: ${code}`
    );

    console.log('Verification code sent to your email');
    
    return NextResponse.json({ 
      success: true, 
      message: 'Verification code sent to your email',
      code
    });

  } catch (error) {
    console.error('Error sending recovery code:', error);
    return NextResponse.json(
      { error: 'Failed to send verification code' },
      { status: 500 }
    );
  }
}
