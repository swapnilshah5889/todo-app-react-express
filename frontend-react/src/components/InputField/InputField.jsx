

const InputField = () => {

    return (
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input type="text" className="bg-gray-50 border border-gray-300 
                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                w-full p-2.5" placeholder="John" required />
        </div>
    );
};

export default InputField;