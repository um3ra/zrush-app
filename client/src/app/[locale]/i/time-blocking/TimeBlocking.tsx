"use client";

import { FormProvider, useForm } from "react-hook-form";
import type { TypeTimeBlockFormState } from "@/shared/api/api-time-block";
import { TimeBlockingForm } from "@/features/time-block/ui";
import { TimeBlockingList } from "@/features/time-block/ui";

export function TimeBlocking() {
    const useFormData = useForm<TypeTimeBlockFormState>();

    return (
        <FormProvider {...useFormData}>
            <div className="mt-8 grid grid-cols-2 gap-12">
                <TimeBlockingList />
                <TimeBlockingForm />
            </div>
        </FormProvider>
    );
}
