import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Field, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { SignInButton } from '@clerk/clerk-react';

const formSchema = z.object({
  email: z.email(),
});

export default function SignInForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <div className="flex px-10 text-center justify-around items-center gap-4 md:gap-6 mt-6">
      <div className="flex-auto">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                {...field}
                id="form-rhf-input-username"
                aria-invalid={fieldState.invalid}
                placeholder="Email address"
                autoComplete="email"
                className="h-12 border-white/50 rounded focus:border-white/70
            focus:ring-white/70 text-2xl bg-gray-900 text-white
            placeholder-gray-300"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="flex-auto">
        <SignInButton
          children={
            <Button
              disabled={!form.formState.isValid}
              type="submit"
              form="form-rhf-input"
              className="text-xl bg-red-600 text-white h-12 w-40 rounded
          hover:bg-red-700 transition-colors duration-300 font-semibold"
            >
              {`Get Started >`}
            </Button>
          }
        />
      </div>
    </div>
  );
}
